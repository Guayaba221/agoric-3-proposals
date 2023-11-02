#!/usr/bin/env tsx
// @ts-check

import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import { imageNameForProposalTest, readProposals } from './common';

const options = {
  match: { short: 'm', type: 'string' },
};
const { values } = parseArgs({ options });

const { match } = values;

const allProposals = readProposals();

const proposals = match
  ? allProposals.filter(p => p.proposalName.includes(match))
  : allProposals;

for (const proposal of proposals) {
  console.log(`Running test image for proposal ${proposal.proposalName}`);
  const { name } = imageNameForProposalTest(proposal);
  // 'rm' to remove the container when it exits
  const cmd = `docker run --rm ${name}`;
  // TODO stream the output
  execSync(cmd);
}