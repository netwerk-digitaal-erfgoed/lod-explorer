async function getAllClasses() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
  try {
    const resp = await fetch(`${apiURL}/iri/getIRIByType/class`, {
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!resp.ok) {
      throw new Error(resp.statusText)
    }
  
    return resp.json();
  } catch (error) {
    console.log(`Error from get class details ${error}`);
  }
}

export default getAllClasses;