import './cortinas.css';

export default function Cortinas() {
    return (
        <div className="contenedorPrincipalCortinas">
            <form className="formularioCortinas">
                <div className="form-group-cortinas">
                    <label htmlFor="altura">Alto(milímetros)</label>
                    <input type="text"
                        id="altura"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                    />
                    <label htmlFor="altura">Ancho(milímetros)</label>
                    <input type="text"
                        id="altura"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                    />
                </div>
            </form>
        </div>
    );
}