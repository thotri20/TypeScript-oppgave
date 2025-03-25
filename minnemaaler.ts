import * as fs from "fs";
import * as process from "process";
import { performance } from "perf_hooks";

function measurePerformance(fileName: string): void {
    global.gc?.();
    const startTime = performance.now();
    const startMemory = process.memoryUsage().heapUsed;

    const data = fs.readFileSync(fileName, "utf-8");
    const numbers = data.split("\n").map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    
    const totalSum = numbers.reduce((acc, num) => acc + num, 0);

    const endTime = performance.now();
    const endMemory = process.memoryUsage().heapUsed;

    const memoryUsed = Math.max(0, (endMemory - startMemory) / (1024 * 1024));
    console.log(`Fil: ${fileName}`);
    console.log(`Sum: ${totalSum}`);
    console.log(`Tid brukt: ${(endTime - startTime).toFixed(6)} ms`);
    console.log(`Minnebruk: ${memoryUsed.toFixed(2)} MB`);
    console.log("-".repeat(40));
}

const testFiles = ["SmallTestList.txt", "MediumTestList.txt", "LargeTestList.txt"];

testFiles.forEach(file => measurePerformance(file));
