import { useState } from 'react';
import '../styles/SendForm.css'

export interface FormProps{
    active: boolean;
    setActive: any;
    time: boolean;
    tariffCost: number;
}

export const SendForm = ( { active, setActive, time, tariffCost }: FormProps ) => {
    const [gratitude, setGratitude] = useState(false);
    const [tooltips, setTooltips] = useState([false, false, false, false]);

    function validationForm(e: any) {
        e.preventDefault();

        let valid = true;
        const form = e.target;
        
        if (!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(form[0].value)){
            valid = false;
            form[0].className += ' input_invalid';
            tooltips[0] = true;
        }
        else {
            form[0].className = 'input';
            tooltips[0] = false;
        }

        if (!/[a-zA-Zа-яА-Я]{2,}\s[a-zA-Zа-яА-Я]{2,}/.test(form[1].value)){
            valid = false;
            form[1].className += ' input_invalid';
            tooltips[1] = true;
        }
        else {
            form[1].className = 'input';
            tooltips[1] = false;
        }

        if (!/\d{11}/i.test(form[2].value)){
            valid = false;
            form[2].className += ' input_invalid';
            tooltips[2] = true;
        }
        else {
            form[2].className = 'input';
            tooltips[2] = false;
        }

        if (!form[4].checked){
            valid = false;
            tooltips[3] = true;
        } else {
            tooltips[3] = false;
        }

        setTooltips([...tooltips]);

        if(!valid)
            return;

        let obj = {email: form[0].value, name: form[1].value, 
            phone: form[2].value, time: time?"year":"month", tariffCost: tariffCost};
        console.log(obj);
        
        for(let i = 0; i < 3; i++){
            form[i].value = '';
        }
        form[4].checked = false;

        setGratitude(true);
    }

    let content;
    if(!gratitude){
        content = 
                    <form className="form" onClick={ e => e.stopPropagation() } onSubmit={ validationForm } noValidate>
                        <div className='form-header'>
                            Оставить заявку
                        </div>
                        <div className='text form-description'>
                            Менеджеры перезвонят или напишут в течение дня.<br/>
                            Поможем определиться и протестировать продукт.<br/>
                            Без спама и навязчивости
                        </div>
                        <div className='inputbox'>
                            <input className='input' id='email' placeholder='Email' autoComplete="off"/>
                            <div className={tooltips[0] ? "tooltip tooltip_active" : "tooltip"}>Ожидался email</div>
                        </div>
                        <div className='inputbox'>
                            <input className='input' id='name' placeholder='Иван Иванов' autoComplete="off"/>
                            <div className={tooltips[1] ? "tooltip tooltip_active" : "tooltip"}>Ожидалось имя и фамилия</div>
                        </div>
                        <div className='inputbox'>
                            <input className='input' id='phone' placeholder='Телефон' autoComplete="off"/>
                            <div className={tooltips[2] ? "tooltip tooltip_active" : "tooltip"}>Ожидался 11-значный номер телефона</div>
                        </div>
                        <button className='send-button' type="submit">Отправить</button>
                        <div className='check-container'>
                            <div className='tooltip_checkbox'>
                                <div className={tooltips[3] ? "tooltip tooltip_active" : "tooltip"}>Необходимо подетвердить</div>
                            </div>
                            <input id='check' className='checkbox' type="checkbox"/>
                            <label htmlFor='check'/>
                            <div className='check-text'>
                                Я соглашаюсь на обработку персональных данных и присоединяюсь к регламенту СБИС
                            </div>
                        </div>
                    </form>
    }
    else{
        content = 
                    <div className='form' onClick={() => { 
                            setGratitude(false);
                            setActive(false)
                        }}>
                        <div className='form-header'>
                            Спасибо за заявку
                        </div>
                        <div className='text'>
                            Наши менеджеры свяжутся с вами в течении 5 минут
                        </div>
                    </div>
    }

    return(
        <div className={active ? "form-screen" : "form-screen active"} onClick={() => { 
                setGratitude(false);
                setActive(false)
            }}>
            { content }            
        </div>
    )
}
