// First implement: Use loop
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Second implement: Use formula
// sum = n*(n+1)/2
function sum_to_n_b(n: number): number {
    return n*(n+1)/2;
}

// Third implement: Use recursion
function sum_to_n_c(n: number = 0): number {
    if (n <=0 )
        return 0;
    return n + sum_to_n_c(n-1)
}

// Test
const a = sum_to_n_a(10);
const b = sum_to_n_b(10);
const c = sum_to_n_c(10);

console.log(a); // should return 55
console.log(b); // should return 55
console.log(c); // should return 55