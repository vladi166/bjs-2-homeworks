"use strict"

function solveEquation(a, b, c) {
	const roots = [];

	const d = b * b - 4 * a * c;
	if (d > 0) {
		const x1 = (-b + Math.sqrt(d)) / (2 * a);
		const x2 = (-b - Math.sqrt(d)) / (2 * a);
		roots.push(x1);
		roots.push(x2);
	} else if (d === 0) {
		const x = -b / (2 * a);
		roots.push(x);
	}

	return roots;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
	const P = (percent / 100) / 12;

	const S = amount - contribution;

	if (S <= 0) return 0;

	const monthlyPayment = S * (P + (P / ((1 + P) ** countMonths - 1)));

	const totalPayment = monthlyPayment * countMonths;

	return Number(totalPayment.toFixed(2));
}
