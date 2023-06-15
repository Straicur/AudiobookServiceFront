import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  //todo dok
  return (
    <div class="footer-basic">
      <footer>
        <ul class="list-inline">
          <li class="list-inline-item">
            <i class="bi bi-door-closed"></i>
          </li>
          <li class="list-inline-item">
            <p class="copyright"> © 2023 Audiobooks</p>
          </li>
          <li class="list-inline-item">
            <a href="#">About</a>
          </li>
          <li class="list-inline-item">
            <a href="#">API</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
