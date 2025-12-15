// База скриптов
const SCRIPTS = {
    "test123": `print("Hello from VSS!")
print("Script loaded successfully!")
game:GetService("StarterGui"):SetCore("SendNotification", {
    Title = "VSS",
    Text = "Script loaded!",
    Duration = 3
})`,

    "speed": `local player = game.Players.LocalPlayer
player.Character.Humanoid.WalkSpeed = 100
print("Speed set to 100")`,

    "fly": `-- Fly script example
print("Fly script loaded")`
};

export default function handler(req, res) {
    // Только POST запросы
    if (req.method !== 'POST') {
        return res.status(400).json({ error: "no" });
    }
    
    // Проверяем что это не браузер
    // Браузеры отправляют эти заголовки, executor'ы обычно нет
    const accept = req.headers['accept'] || '';
    const secFetch = req.headers['sec-fetch-mode'];
    const secDest = req.headers['sec-fetch-dest'];
    
    // Браузеры всегда шлют sec-fetch-mode и accept с text/html
    if (secFetch || secDest || accept.includes('text/html')) {
        return res.status(403).json({ error: "no" });
    }
    
    // Получаем ключ
    const { key } = req.body || {};
    
    if (!key) {
        return res.status(400).send("-- no key");
    }
    
    const script = SCRIPTS[key];
    
    if (!script) {
        return res.status(404).send("-- not found");
    }
    
    // Логируем
    console.log(`[OK] Key: ${key} | IP: ${req.headers['x-forwarded-for'] || 'unknown'}`);
    
    // Отдаём скрипт
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(script);
}
