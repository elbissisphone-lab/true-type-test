/**
 * True Type Test Demo Simulation
 */

import { UserSession, getNextQuestion } from './engine.js';
import { QUESTION_POOL } from './questions.js';

const session = new UserSession();

console.log("--- INITIALIZING TRUE TYPE TEST ADAPTIVE ENGINE ---");
console.log(`Starting with ${QUESTION_POOL.length} questions in pool.`);

// Simulation of a user who is likely an INTJ 5w6 (ILI in Socionics)
const userProfile = {
    "core_01": 2,  // Logic/Efficiency: Agree
    "core_02": 2,  // Patterns/Future: Agree
    "core_03": 1,  // Authenticity: Agree
    "core_04": -2, // Social Harmony: Disagree
    "core_05": -2, // Sensory/Thrill: Disagree
    "core_06": -1, // Ne-style Brainstorming: Disagree
    "core_07": 2,  // Ti/Precision: Agree
    "core_08": 0,  // Si/Past: Neutral
    "core_09": 2,  // Competence/Withdrawal (E5): Agree
    "core_10": 1   // Ideals: Agree
};

let step = 1;
while (!session.isThresholdReached() && session.answeredIds.size < QUESTION_POOL.length) {
    const q = getNextQuestion(session, QUESTION_POOL);
    if (!q) break;

    const answer = userProfile[q.id] || 0;
    session.update(q, answer);

    console.log(`\n[Step ${step++}] Question: ${q.text}`);
    console.log(`User Answer: ${answer}`);
    
    const results = session.getResults();
    console.log(`Current Top Probabilities:`);
    console.log(` - MBTI: ${results.mbti[0]} (${(results.mbti[1] * 100).toFixed(1)}%)`);
    console.log(` - Enneagram: ${results.enneagram[0]} (${(results.enneagram[1] * 100).toFixed(1)}%)`);
    console.log(` - Socionics: ${results.socionics[0]} (${(results.socionics[1] * 100).toFixed(1)}%)`);
    console.log(`Aggregate Certainty: ${(session.certainty * 100).toFixed(1)}%`);

    if (session.isThresholdReached()) {
        console.log("\n>>> EARLY EXIT TRIGGERED: Confidence threshold reached.");
    }
}

console.log("\n--- FINAL TYPOLOGY PROFILE ---");
const final = session.getResults();
console.log(`MBTI: ${final.mbti[0]}`);
console.log(`Enneagram: ${final.enneagram[0]}`);
console.log(`Socionics: ${final.socionics[0]}`);
console.log(`Final Certainty: ${(final.certainty * 100).toFixed(1)}%`);
console.log(`Questions Answered: ${session.answeredIds.size}`);
