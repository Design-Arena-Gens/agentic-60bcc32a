import AvatarDesigner from '@/components/AvatarDesigner';

export default function Home() {
  return (
    <main>
      <div className="layout-grid">
        <section>
          <h1 className="hero-title">Trade Day — бренд, который ускоряет сделки и рост капитала</h1>
          <p className="hero-subtitle">
            Соберите фирменный аватар Trade Day, где энергия биржевых графиков встречается с динамикой
            автомобильных продаж. Цвета, текст и детали легко настраиваются, а готовый результат можно
            мгновенно экспортировать.
          </p>
          <div className="feature-list">
            <div className="feature-card">
              <strong>Нейродинамика</strong>
              <span>Градиенты и свечи в центре композиции создают атмосферу точного трейд-анализа.</span>
            </div>
            <div className="feature-card">
              <strong>Автодрайв</strong>
              <span>Линии кузова и огни подчеркивают специализацию на быстром обмене автомобилями.</span>
            </div>
            <div className="feature-card">
              <strong>Готовность к пичу</strong>
              <span>Скачивайте аватар в PNG и используйте его в соцсетях, презентациях и на странице бренда.</span>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Настрой свой Trade Day</h2>
          <AvatarDesigner />
        </section>
      </div>
    </main>
  );
}
