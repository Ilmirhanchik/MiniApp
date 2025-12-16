import './App.css';
import { MaxUI } from '@maxhub/max-ui';
import '@maxhub/max-ui/dist/styles.css';
import './style.css';
import React, { useState } from 'react';
import { ChevronRight, ExternalLink, CheckCircle } from 'lucide-react';

function App() {


  // Состояние для хранения текста заявки
  const [applicationText, setApplicationText] = useState('');
  // Состояние для отображения сообщения об успешной отправке/перенаправлении
  const [message, setMessage] = useState(null);

  // URL для перенаправления (используем общий URL Госуслуг)
  const GOSUSLUGI_URL = 'https://www.gosuslugi.ru/';

  /**
   * Обработчик перенаправления.
   * Выполняет имитацию обработки заявки и затем перенаправляет пользователя.
   */
  const handleRedirectToGosuslugi = () => {
    // 1. Имитация отправки/фиксации заявки
    console.log('Заявка отправлена (имитация):', applicationText);

    // 2. Отображение сообщения о перенаправлении
    setMessage({
      type: 'success',
      text: 'Ваша предварительная заявка принята. Сейчас произойдет перенаправление на Госуслуги для завершения оформления.',
    });

    // 3. Выполнение перенаправления через короткую задержку
    setTimeout(() => {
      // Использование window.open() может быть предпочтительнее для внешних ссылок,
      // чтобы не закрывать окно мессенджера.
      window.open(GOSUSLUGI_URL, '_blank');

      // Сбрасываем сообщение, чтобы пользователь мог нажать кнопку еще раз, если 
      // перенаправление было заблокировано браузером, или просто вернуться в приложение.
      setMessage(null);
    }, 1500); // Задержка 1.5 секунды для отображения сообщения
  };

  return (
    <MaxUI>
      
    <div class="container">

        <div class="app">
            <h1>
                Подача Заявки (Переход на Госуслуги)
            </h1>
            <p>
                Введите информацию о вашей заявке. Для официального оформления вы будете перенаправлены на портал
                Госуслуги.
            </p>

            <div class="inputs">
                <label htmlFor="application">
                    Краткое описание заявки (необязательно)
                </label>
                <textarea id="application" rows="4" value={applicationText} onChange={(e)=> setApplicationText(e.target.value)}
                placeholder="Например: оформление субсидии на ЖКХ"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-none text-sm"
              ></textarea>
                
                {message && (
                    <div
                    className={`flex items-center p-4 rounded-lg mb-6 shadow-md
                    ${message.type === 'success'
                    ? 'bg-green-50 border border-green-300 text-green-700'
                    : 'bg-red-50 border border-red-300 text-red-700'
                    }`}
                    >
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
                )}

                <button onClick={handleRedirectToGosuslugi} disabled={!!message} className={`w-full flex items-center
                    justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg
                    transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4
                    focus:ring-blue-500/50 ${message ? 'bg-gray-400 cursor-wait'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800' }`}>
                    <ExternalLink />
                    {message ? 'Подготовка к перенаправлению...' : 'Перейти на Госуслуги'}
                    <ChevronRight />
                </button>
            </div>

            <p>
                *Откроется новое окно/вкладка браузера.
            </p>
        </div>
    </div>
    </MaxUI>
  );
}
export default App;
