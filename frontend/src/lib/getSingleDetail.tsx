interface dataInfo {
    name: string;
    classId: string;
    domainName: string[];
}

async function getSingleDetail(data: dataInfo) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    try {
        if (!data.classId || data.classId === "") {
            throw new Error('Invalid Class information')
        }

        const resp = await fetch(`${apiURL}/lod/getSingleDynamicData`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...data}),
            next: {
                revalidate: 3
            }
        });

        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        return resp.json();
    } catch (error) {
        console.log(error)
    }
}

export default getSingleDetail;