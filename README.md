# AudiobookServiceFront
Jest to frontend aplikacji do zarządzania audiobookami. Aplikacja z założenia została stworzona jako koncept darmowej biblioteki ale jest przygotowana do implementacji płatności dzięki dodaniu ról w systemie. Pomaga Administratorowi zautomatyzować zarządzanie taką biblioteką a użytkownikowi umożliwia swobodny odsłuch z dodatkowymi funkcjonalnościami. Wykorzystany został tu react oraz host vercel.
<br>

# Opis
## Admin
Administrator ma możliwość dodawania nowych kategorii i przypisywania do nich audiobooków, audiobooki natomiast dodaje w odpowiednim formacie pliku zip, który składa się z plików mp3 oraz cover jpg lub png, a następnie może nimi zarządzać (odsłuch, pobranie informacji oraz ich edycja, ponowne przesłanie, usunięcie i dodanie kategorii oraz usunięcie audiobooka z kategorii oraz systemu). Zarządzając użytkownikami może im zmieniać chociażby: rolę, telefon, hasło i aktywować ich. Dodatkową opcją dla użytkownika jest prośba o usunięcie konta, którą również rozpatruje administrator. Ostatnią funkcjonalności jest dodawanie powiadomień np. wygenerowanie co tygodniowej listy proponowanych, dodanie nowego audiobooka lub kategorii.

## User
Użytkownik na początku otrzymuje listę wszystkich audiobooków z podziałem na kategorie oraz listę proponowanych (ustalana na podstawie lubianych kategorii). Po odsłuchu odpowiedniej ilości audiobooków pojawi się lista proponowanych na ich podstawie. Po pobraniu detali audiobooka ma możliwość odsłuchu z wszystkimi udogodnieniami jak komentarze oraz ich likowanie, ocena audiobooka po przesłuchaniu minimum połowy i dodania/usunięcia z mojej listy. Oczywiście moja lista jest to lista szybkiego dostępu do ulubionych audiobooków. Może również zarządzać swoim kontem w ograniczonym ale wystarczającym stopniu, może np: zmienić hasło i email, informacje takie jak imię czy telefon oraz wysłać prośbę o usunięcie konta. Dodatkowo otrzymuje powiadomienia systemowe. Zostały dodane dodatkowo takiego strony jak O nas, polityka prywatności oraz odnośniki do tej dokumentacji oraz rest Api z którego korzysta.

<br>

## Podział aplikacji z funkcjonalnościami 
<ol>
  <li>Administrator
    <ul>
      <li>Zarządzanie kategoriami</li>
      <li>Zarządzanie audiobookami</li>
      <li>Zarządzanie użytkownikami</li>
      <li>Zarządzanie powiadomieniami</li>
    </ul>
  </li>
  <li>User
    <ul>
      <li>Możliwość odsłuchu audiobooka</li>
      <li>Lista proponownych</li>
      <li>Możliwość dodania komentarza oraz ich likowanie</li>
      <li>Możliwość oceny audiobooka</li>
      <li>Możliwość dodania do mojej listy</li>
      <li>Możliwość zmiany ustawień konta</li>
      <li>Otrzymywanie powiadomień</li>
      <li>Rejestracja i logowanie</li>
      <li>Odzyskiwanie hasła</li>
    </ul>
  </li>
<ol>
