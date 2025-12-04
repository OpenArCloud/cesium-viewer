const MAPBUILDER_URL = import.meta.env.VITE_MAPBUILDER_URL;

/**
 * @param {string} hlocId
 * @param {string} dataSetId
 */
export async function getPointCloud(hlocId, dataSetId) {
  const mapUrl = `${MAPBUILDER_URL}/maps/${dataSetId}/hloc/${hlocId}/download`;


  const res = await fetch(mapUrl, { credentials: "include" });

  if (!res.ok) {
    throw new Error(`GET pointcloud failed: ${res.status}`);
  }

  // Parse the multipart body
  const form = await res.formData();

  // Adjust field names to whatever your backend uses
  //const jsonFile = form.get("json");
  const plyBlob = form.get("ply");
  if(!plyBlob){
    throw new Error(`No PLY in response: ${res.status}`);
  }

  return plyBlob;
}

export async function getTransform(hlocId, dataSetId) {
  const url = `${MAPBUILDER_URL}/maps/${dataSetId}/hloc/${hlocId}/transform`;


  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    throw new Error(`GET transform failed: ${res.status}`);
  }

  return await res.json();
}


/**
 * @param {string} hlocId
 * @param {string} dataSetId
 * @param {object} payload { latitude, longitude, height, matrix }
 */
export async function postTransform(hlocId, dataSetId, payload) {
  const url = `${MAPBUILDER_URL}/maps/${dataSetId}/hloc/${hlocId}/transform`;

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

  const res = await fetch(`${MAPBUILDER_URL}/convert`, {
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
