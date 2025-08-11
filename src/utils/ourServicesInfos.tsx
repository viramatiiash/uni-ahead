import {
  FirstPlaceMedalIcon,
  SecondPlaceMedalIcon,
  ThirdPlaceMedalIcon,
} from '@assets/icons';

const ourServicesInfos = {
  title: 'Наші послуги',
  subtitle:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

const ourCourses = [
  {
    title: 'UniAhead',
    tabs: [
      {
        title: 'Basic',
        icon: <ThirdPlaceMedalIcon />,
        price: '2700',
        description:
          'Вибрати золоту середину - це дуже розумно :) Адже сюди входить усе необхідне для того, щоб комфортно почати своє навчання!',
        services: [
          {
            title: 'Вступ',
            description: [
              <p className='courseItem'>
                Індивідуальний підбір університету та спеціальності відповідно
                до побажань клієнта
              </p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Проживання',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Посвідка на проживання',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'> </p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Участь у заходах для адаптації',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
        ],
      },
      {
        title: 'Premiere',
        icon: <SecondPlaceMedalIcon />,
        price: '2700',
        description:
          'Вибрати золоту середину - це дуже розумно :) Адже сюди входить усе необхідне для того, щоб комфортно почати своє навчання!',
        services: [
          {
            title: 'Вступ',
            description: [
              <p className='courseItem'>
                <span className='courseItemBold'>Індивідуальний</span> підбір
                університету та спеціальності відповідно до побажань клієнта
              </p>,
              <p className='courseItem'>
                <span className='courseItemBold'>Консультація</span> та
                <span className='courseItemBold'>координація</span> на всіх
                етапах роботи
              </p>,
              <p className='courseItem'>
                Підготовка, відправка та подання повного пакета документів до{' '}
                <span className='courseItemOrange'>2</span>
                обраних університетів (максимум на{' '}
                <span className='courseItemOrange'>4</span> спеціальності)
              </p>,
              <p className='courseItem'>
                <span className='courseItemBold'>Контроль</span> усіх етапів
                процесу вступу
              </p>,
              <p className='courseItem'>
                <span className='courseItemBold'>Реєстрація</span> в
                університеті та запис на{' '}
                <span className='courseItemBold'>підготовчі курси</span>
              </p>,
              <p className='courseItem'>
                Оплата (<span className='courseItemRed'>окрім</span>{' '}
                <span className='courseItemBold'>MedAT:</span>{' '}
                <span className='courseItemRed'>+ 50€</span>), реєстрація та
                супровідна вступні іспити в університеті (1 раз)
              </p>,
              <p className='courseItem'>
                <span className='courseItemBold'>Легалізація</span>,{' '}
                <span className='courseItemBold'>переклад</span> та{' '}
                <span className='courseItemBold'>оформлення</span>
                необхідних документів (атестату, додатка до атестату та інших
                документів) для вступу до обраного закладу вищої освіти
              </p>,
              <p className='courseItem'>
                <span className='courseItemBold'>
                  Супровід під час зарахування в університеті
                </span>{' '}
                після успішного завершення підготовчого відділення
              </p>,
            ],
          },
          {
            title: 'Проживання',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Посвідка на проживання',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'> </p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Участь у заходах для адаптації',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
        ],
      },
      {
        title: 'Elite',
        icon: <FirstPlaceMedalIcon />,
        price: '2700',
        description:
          'Вибрати золоту середину - це дуже розумно :) Адже сюди входить усе необхідне для того, щоб комфортно почати своє навчання!',
        services: [
          {
            title: 'Вступ',
            description: [
              <p className='courseItem'>
                Індивідуальний підбір університету та спеціальності відповідно
                до побажань клієнта
              </p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Проживання',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Посвідка на проживання',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'> </p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
          {
            title: 'Участь у заходах для адаптації',
            description: [
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
              <p className='courseItem'></p>,
            ],
          },
        ],
      },
    ],
  },
];
