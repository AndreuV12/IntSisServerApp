import math from 'math'

export function genCode(n) {
    return math.trunc(math.random()*10**n).toString().padStart(n,'0')
}