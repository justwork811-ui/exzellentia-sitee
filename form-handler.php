<?php
// Получаем данные из формы
$name = htmlspecialchars($_POST['name']); // Фильтруем данные от инъекций
$email = htmlspecialchars($_POST['email']);
$phone = htmlspecialchars($_POST['phone']);
$message = htmlspecialchars($_POST['message']);
$propertyType = htmlspecialchars($_POST['propertyType']);

// Telegram Bot API для отправки сообщения в Telegram
$token = "8282995143:AAEirmJ1t54WmHrlV268wcTdVMmYYN9Rcw0"; // Токен твоего бота
$chat_id = "769658993"; // Твой chat_id

// Формируем текст сообщения для бота
$telegram_message = "Neue Anfrage:\n\nName: $name\nE-Mail: $email\nTelefon: $phone\nNachricht: $message\nObjektart: $propertyType";

// Формируем URL для запроса в Telegram API
$telegram_url = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($telegram_message);

// Отправка сообщения в Telegram
file_get_contents($telegram_url);

// Перенаправляем пользователя на страницу благодарности
header("Location: thank_you.html");
exit();
?>
