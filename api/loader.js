export default function handler(req, res) {
    const loader = `-- VSS Loader
local script_key = "test123" -- Замени на свой ключ

local HttpService = game:GetService("HttpService")
local url = "https://ВАШ-САЙТ.vercel.app/get"

local function request_func(data)
    if syn and syn.request then
        return syn.request(data)
    elseif request then
        return request(data)
    elseif http_request then
        return http_request(data)
    elseif fluxus and fluxus.request then
        return fluxus.request(data)
    end
    return nil
end

local response = request_func({
    Url = url,
    Method = "POST",
    Headers = {["Content-Type"] = "application/json"},
    Body = HttpService:JSONEncode({key = script_key})
})

if response and response.StatusCode == 200 then
    local fn, err = loadstring(response.Body)
    if fn then
        fn()
    else
        warn("[VSS] Error:", err)
    end
else
    warn("[VSS] Failed to load script")
end`;

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(loader);
}
