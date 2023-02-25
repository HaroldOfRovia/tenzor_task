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

    function validationForm(e: any){
        const form = e.target;
        e.preventDefault();
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(form[0].value)){
            console.log("Email is incorrect!");
            return;
        }
        if (/^\s*$/.test(form[1].value)){
            console.log("Name is incorrect!");
            return;
        }
        if (!/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/i.test(form[2].value)){
            console.log("Number of phone is incorrect!");
            return;
        }
        if (!form[4].checked){
            console.log("Checkbox is incorrect!");
            return;
        }

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
                    <form className="form" onClick={ e => e.stopPropagation() } onSubmit={ validationForm }>
                        <div className='form-header'>
                            Оставить заявку
                        </div>
                        <div className='text form-description'>
                            Менеджеры перезвонят или напишут в течение дня.<br/>
                            Поможем определиться и протестировать продукт.<br/>
                            Без спама и навязчивости
                        </div>
                        <div className='inputbox'>
                            <input className='input' id='email' type="email" required/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className='inputbox'>
                            <input className='input' id='name' required/>
                            <label htmlFor="name">Фамилия Имя</label>
                        </div>
                        <div className='inputbox'>
                            <input className='input' id='phone' required/>
                            <label htmlFor="phone">Телефон</label>
                        </div>
                        <button className='send-button' type="submit">Отправить</button>
                        <div className='check-container'>
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
                    <div className='form' onClick={() => { setActive(false) }}>
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
