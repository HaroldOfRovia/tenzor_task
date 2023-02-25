import '../styles/Tariff.css';

interface TariffData {
    name: string;
    cost: number;
    description: string;
    showForm: any;
}

export const Tariff = ({name, cost, description, showForm}: TariffData) => {

    return(
        <div className='tariff'>
            <div className='tariff-pic tariff-pic-high'/>
            <div className='tariff-description'>
                <div>
                    <div className='tariff-type'>
                    <div className='tariff-name'>
                        {name}
                    </div>
                    <div className='tariff-price'>
                        {cost}₽
                    </div>
                    </div>
                    <div className='tariff-text'>
                        {description}
                    </div>
                </div>
                <div className='round-button pay-button' onClick={() => showForm(cost)}>Начать бесплатно</div>
            </div>
        </div>
    );
}