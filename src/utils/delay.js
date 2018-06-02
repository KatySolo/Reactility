export default function delay(delay_time) {
    return new Promise(f => setTimeout(f, delay_time))
}