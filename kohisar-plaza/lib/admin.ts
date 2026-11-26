"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { IMAGE_BUCKET } from "@/lib/supabase";

/** Resize a photo in the browser before upload (max 1600px, JPEG ~82%). */
export async function compressImage(file: File, maxSide = 1600, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported in this browser");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not compress image"))),
      "image/jpeg",
      quality
    )
  );
}

/** Upload one photo to Supabase Storage and return its public URL. */
export async function uploadPropertyImage(
  supabase: SupabaseClient,
  propertyId: string,
  file: File
): Promise<string> {
  const blob = await compressImage(file);
  const path = `${propertyId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, blob, { contentType: "image/jpeg", upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Delete a photo from Storage if it was uploaded through the admin (Unsplash links are left alone). */
export async function deletePropertyImage(supabase: SupabaseClient, publicUrl: string) {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const i = publicUrl.indexOf(marker);
  if (i === -1) return;
  const path = decodeURIComponent(publicUrl.slice(i + marker.length));
  await supabase.storage.from(IMAGE_BUCKET).remove([path]);
}

/** Ask the server to refresh the public pages after a change. */
export async function refreshPublicSite(supabase: SupabaseClient): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return false;
  const res = await fetch("/api/revalidate", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}

export const formatPKR = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
