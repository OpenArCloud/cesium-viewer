const BASE_API = "/api";

/**
 * @param {string} mapId
 * @param {string} hlocId
 * @param {string} dataSetId
 */
export async function getTransform(mapId, hlocId, dataSetId) {
  const url = `${BASE_API}/maps/${mapId}/hloc/${hlocId}/transform?dataSetId=${dataSetId}`;

  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    throw new Error(`GET transform failed: ${res.status}`);
  }

  // Parse the multipart body
  const form = await res.formData();

  // Adjust field names to whatever your backend uses
  const jsonFile = form.get("json");
  const plyFile = form.get("ply");

  // Convert JSON part to object
  const json = await jsonFile.json();

  // The PLY part is a Blob containing the .ply file
  const plyBlob = plyFile;

  return { json, plyBlob };
}


/**
 * @param {string} mapId
 * @param {string} hlocId
 * @param {string} dataSetId
 * @param {object} payload { latitude, longitude, height, matrix }
 */
export async function postTransform(mapId, hlocId, dataSetId, payload) {
  const url = `${BASE_API}/maps/${mapId}/hloc/${hlocId}/transform?dataSetId=${dataSetId}`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`POST transform failed: ${res.status}`);
  }

  return await res.json();
}

export async function convertPlyToGlb(plyBlob) {
  const form = new FormData();

  // You MUST give the file a filename for most backends
  form.append("file", plyBlob, "model.ply");

  const res = await fetch(`${BASE_API}/convert/ply-to-glb`, {
    method: "POST",
    body: form,
    credentials: "include" // only if needed
  });

  if (!res.ok) {
    throw new Error(`PLY → GLB conversion failed: ${res.status}`);
  }

  const glbBlob = await res.blob();

  return glbBlob;
}
