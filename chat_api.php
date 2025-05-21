<?php
// ملف API للشات بوت
header('Content-Type: application/json');

// التحقق من طريقة الطلب
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'طريقة طلب غير صالحة']);
    exit;
}

// الحصول على البيانات المرسلة
$data = json_decode(file_get_contents('php://input'), true);

// التحقق من وجود البيانات المطلوبة
if (!isset($data['user_message']) || !isset($data['bot_response']) || !isset($data['timestamp'])) {
    echo json_encode(['status' => 'error', 'message' => 'بيانات غير كاملة']);
    exit;
}

// تنظيف البيانات
$user_message = filter_var($data['user_message'], FILTER_SANITIZE_STRING);
$bot_response = filter_var($data['bot_response'], FILTER_SANITIZE_STRING);
$timestamp = filter_var($data['timestamp'], FILTER_SANITIZE_STRING);

// إنشاء سجل للرسالة
$log_entry = [
    'timestamp' => $timestamp,
    'user_message' => $user_message,
    'bot_response' => $bot_response,
    'ip' => $_SERVER['REMOTE_ADDR']
];

// حفظ الرسالة في ملف JSON
$chat_log_file = 'admin/chat_logs.json';

// التحقق من وجود الملف وإنشائه إذا لم يكن موجوداً
if (!file_exists($chat_log_file)) {
    file_put_contents($chat_log_file, json_encode([]));
}

// قراءة السجلات الحالية
$current_logs = json_decode(file_get_contents($chat_log_file), true);

// إضافة السجل الجديد
$current_logs[] = $log_entry;

// حفظ السجلات المحدثة
file_put_contents($chat_log_file, json_encode($current_logs, JSON_PRETTY_PRINT));

// إرسال إشعار بالبريد الإلكتروني إلى المسؤول (اختياري)
$admin_email = "ghanimmohmmad@gmail.com";
$subject = "رسالة جديدة من شات بوت Ad Nova";
$message = "تم استلام رسالة جديدة من الشات بوت:\n\n";
$message .= "الوقت: " . date('Y-m-d H:i:s', strtotime($timestamp)) . "\n";
$message .= "رسالة المستخدم: " . $user_message . "\n";
$message .= "رد البوت: " . $bot_response . "\n";
$message .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n\n";
$message .= "يمكنك الرد على هذه الرسالة من خلال لوحة التحكم.";

$headers = "From: noreply@adnova.ps\r\n";
$headers .= "Reply-To: noreply@adnova.ps\r\n";

// إرسال البريد الإلكتروني (معطل افتراضياً لتجنب الإزعاج أثناء الاختبار)
// mail($admin_email, $subject, $message, $headers);

// إرسال استجابة نجاح
echo json_encode(['status' => 'success', 'message' => 'تم حفظ الرسالة بنجاح']);
?>
