import './styles/App.css';
import image1 from './images/Image1.png';
import image2 from './images/Image2.png';
import image3 from './images/Image3.png';
import image4 from './images/Image4.png';
import image5 from './images/Image5.png';
import image6 from './images/Image6.png';
import bootstrap from './images/bootstrap.svg';
import html5 from './images/html5.svg';
import rickroll from './videos/rickroll.mp4';
import { useRef, useState } from 'react';
import { SendForm } from './components/SendForm';
import { Tariff } from './components/Tariff';

function App() {

  const videoRef = useRef(null);
  const [playOpacity, setPlayOpacity] = useState(1);
  const [formVisibility, setFormVisibility] = useState(false);
  const [time, setTime] = useState(false);//false - месяц, true - год
  const [tariffCost, setTariffCost] = useState(0);

  function playpause(){
    const video = videoRef.current;
    if (videoRef.current === null)
      return;
    if (video.paused || video.ended) {
      videoRef.current.play();
      setPlayOpacity(0);
    } else {
      videoRef.current.pause();
      setPlayOpacity(1);
    }
  };

  function showForm(cost: number){
    setTariffCost(cost);
    setFormVisibility(true);
  }

  return (
    <div className="app">

      <header className="header">
        <nav className='header-nav'>
          <div>Изображения</div>
          <div>Видео</div>
          <div>3D модели</div>
          <div className='round-button pink-button'>Войти</div>
        </nav>
      </header>

      <main className='main'>
        <div className='greeting-block'>
          <div className='greeting-text'>
            <h1 className='greeting'>Превратите свои идеи в реальные достижения</h1>
            <h2 className='greeting-description'>
              Теперь у вас под рукой всегда есть нужные изображения, видео, музыка, 
              3D-модели, редакционные материалы и авторские продукты. 
            </h2>
          </div>
        </div>

        <div className='gallery-container'>
          <img src={image1} className="image" style={{ gridRow: "1/3" }} alt='img1'/>
          <img src={image3} className="image" style={{ gridRow: "1/4" }} alt='img3'/>
          <img src={image4} className="image" style={{ gridRow: "1/2" }} alt='img4'/>
          <img src={image2} className="image" style={{ gridRow: "3/5" }} alt='img2'/>
          <img src={image5} className="image" style={{ gridRow: "4/5" }} alt='img5'/>
          <img src={image6} className="image" style={{ gridRow: "2/5" }} alt='img6'/>
        </div>

        <div className='video-gallery'>
          <h2 className='video-header font42'>
            Поможем сделать ваш продукт уникальным
          </h2>
          <div className='video-player'>
            <video 
                ref={videoRef}
                id='video'
                className="tmp-vid"
                src={rickroll}
                onClick={playpause}
            ></video>
            <button id='playpause' style={{opacity: `${playOpacity}`}} onClick={playpause}><div className='play-button'/></button>
          </div>
          <nav className='video-nav'>
            <div className='video-nav-element'>
              <div className='img-video-nav'>
                <div className='play-button'/>
              </div>
              <h3 className='nav-video-header'>эксклюзив</h3>
              <div className='nav-video-description'>Используйте уникальный контент в своих целях</div>
            </div>
            <div className='video-nav-element'>
              <div className='img-video-nav'>
                <div className='play-button'/>
              </div>
              <h3 className='nav-video-header'>высокое качество</h3>
              <div className='nav-video-description'>Используйте уникальный контент в своих целях</div>
            </div>
          </nav>
        </div>

        <div className='more-block'>
          <div className='more-block-text'>
            {/* <div> */}
              <h2 className='more-block-header font42'>Создавайте свои сайты в пару кликов</h2>
              <div className='more-block-description'>
                Мы создали новый продукт, который поможет дизайнерам, разработчикам и небольшим стартапам создать свой сайт быстро и просто.
              </div>
              <div className='round-button pink-button'>Подробнее</div>
            </div>
            <div className='technologies'>
              <div className='tech'>
                <img src={ bootstrap } className='tech-pic' alt='bootstrap'/>
                <h3 className='tech-header'>Bootstrap 4</h3>
                <div className='tech-description'>
                  HTML верстка основана на одном из самых распространенных и надежных фреймворков
                </div>
              </div>
              <div className='tech'>
                <img src={ html5 } className='tech-pic' alt='html5'/>
                <h3 className='tech-header'>HTML5 & CSS3</h3>
                <div className='tech-description'>
                  Для достижения наилучшего результата мы использовали только проверенные временем технологии.
                </div>
              </div>
            </div>
          {/* </div> */}
          <div className='more-block-pic'/>
        </div>

        <div className='spend-money'>
          <h2 className='money-description font42'>
            У нас есть два тарифа
          </h2>
          <div className='switch-container'>
            <div>Месяц</div>

            <label className='switch'>
              <input id='time' type='checkbox' onClick={() => { setTime(!time) }}/>
              <div className='slider'/>
            </label>
            
            <div>Год</div>
          </div>
          <div className='choose-tariff'>
            <Tariff name={"Оптимальный"} cost={500} 
              description={"Редактируйте фото и видео в режиме онлайн. Создавайте одностраничные сайты  из готовых компонентов"}
              showForm={showForm}/>
            <Tariff name={"Профи"} cost={1000} 
              description={"Редактируйте фото и видео в режиме онлайн. Создавайте одностраничные и многостраничные сайты  из готовых компонентов."}
              showForm={showForm}/>
          </div> 
        </div>
        <SendForm active={formVisibility} setActive={setFormVisibility} time={time} tariffCost={tariffCost}/>
      </main>
    </div>
  );
}

export default App;

