async function getDomainNames(id: string) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    try {
        if (!id || id === "") {
            throw new Error('Invalid Class information')
        }

        const resp = await fetch(`${apiURL}/lod/getDomainNames/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 3
            }
        });

        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
        return resp.json();
    } catch (error) {
        
    }
}

export default getDomainNames;