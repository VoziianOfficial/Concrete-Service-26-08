<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/config/config.js';
$recipient = 'hello@stonedropconcrete.com';
if (is_readable($configPath)) {
    $config = file_get_contents($configPath);
    if (preg_match('/email:\s*"([^"]+)"/', $config, $match)) {
        $recipient = $match[1];
    }
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $service === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['message' => 'Please complete all required fields']);
    exit;
}

$subject = 'Concrete service request';
$body = "Name: {$name}\nEmail: {$email}\nService: {$service}\n\nMessage:\n{$message}\n";
$headers = [
    'From: no-reply@localhost',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));

echo json_encode(['message' => 'Successfully sent', 'sent' => $sent]);
?>
