<?php
// تكوين معلومات البريد الإلكتروني
$recipient_email = "ghanimmohmmad@gmail.com"; // البريد الإلكتروني للمستلم
$subject_prefix = "رسالة جديدة من موقع Ad Nova: "; // بادئة عنوان الرسالة

// التحقق من وجود البيانات المرسلة
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // التحقق من وجود جميع الحقول المطلوبة
    if (
        !empty($_POST['name']) &&
        !empty($_POST['email']) &&
        !empty($_POST['subject']) &&
        !empty($_POST['message'])
    ) {
        // تنظيف البيانات وحمايتها
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
        $message_content = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        
        // التحقق من صحة البريد الإلكتروني
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['status' => 'error', 'message' => 'يرجى إدخال بريد إلكتروني صحيح']);
            exit;
        }
        
        // إعداد عنوان البريد
        $email_subject = $subject_prefix . $subject;
        
        // إعداد محتوى البريد
        $email_body = "
            <html>
            <head>
                <title>رسالة جديدة من موقع Ad Nova</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                    h2 { color: #FFAF55; }
                    .info { margin-bottom: 20px; }
                    .label { font-weight: bold; }
                    .footer { margin-top: 30px; font-size: 12px; color: #777; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <h2>رسالة جديدة من موقع Ad Nova</h2>
                    <div class='info'>
                        <p><span class='label'>الاسم:</span> $name</p>
                        <p><span class='label'>البريد الإلكتروني:</span> $email</p>
                        <p><span class='label'>الموضوع:</span> $subject</p>
                    </div>
                    <div class='message'>
                        <p><span class='label'>الرسالة:</span></p>
                        <p>$message_content</p>
                    </div>
                    <div class='footer'>
                        <p>تم إرسال هذه الرسالة من نموذج الاتصال في موقع Ad Nova.</p>
                    </div>
                </div>
            </body>
            </html>
        ";
        
        // إعداد رؤوس البريد
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $name <$email>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        
        // محاولة إرسال البريد
        if (mail($recipient_email, $email_subject, $email_body, $headers)) {
            // حفظ نسخة من الرسالة في ملف للاحتياط
            $log_file = 'contact_messages.log';
            $log_message = date('Y-m-d H:i:s') . " - من: $name ($email), الموضوع: $subject\n";
            file_put_contents($log_file, $log_message, FILE_APPEND);
            
            // إرسال رد نجاح
            echo json_encode(['status' => 'success', 'message' => 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.']);
        } else {
            // إرسال رد خطأ
            echo json_encode(['status' => 'error', 'message' => 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.']);
        }
    } else {
        // إرسال رد في حالة نقص البيانات
        echo json_encode(['status' => 'error', 'message' => 'يرجى ملء جميع الحقول المطلوبة.']);
    }
} else {
    // إرسال رد في حالة الوصول المباشر للملف
    echo json_encode(['status' => 'error', 'message' => 'طريقة وصول غير صحيحة.']);
}
?>
