import './envio.css';

export default function Envio() {

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://correo-argentino1.p.rapidapi.com/calcularPrecio';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '0e5145a069msh4eb3b9a6fab29b5p18c8b2jsne57a088a80d3',
                    'X-RapidAPI-Host': 'correo-argentino1.p.rapidapi.com'
                },
                body: JSON.stringify({
                    cpOrigen: '1000',
                    cpDestino: '2000',
                    provinciaOrigen: 'AR-B',
                    provinciaDestino: 'AR-S',
                    peso: '5'
                })
            };
    
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <>
        </>
    );
}