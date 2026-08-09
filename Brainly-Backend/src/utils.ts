export function random(len: number){
    let option = "wqefwregbhty4534245thrgbdacdvfbghnmjkyutnhfdvserbgfsvadfrg";
    let ans = "";
    let lenght = option.length;

    for(let i =0; i< len;i++){
        ans += option[Math.floor((Math.random()* lenght))] //0=>20
    }
    return ans;
}