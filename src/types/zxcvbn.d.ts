declare module 'zxcvbn' {
    export interface ZXCVBNResult {
        score: number
        feedback: {
            warning: string
            suggestions: string[]
        }
        guesses: number
        guesses_log10: number
        calc_time: number
        crack_times_display: Record<string, string>
        crack_times_seconds: Record<string, number>
        password: string
        sequence: any[]
    }

    function zxcvbn(password: string): ZXCVBNResult
    export default zxcvbn
}
