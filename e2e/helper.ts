import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { DocumentData } from 'firebase/firestore';

import { readFileSync } from 'fs';

export type UserAuth = {
  id: string;
  email: string;
  displayName?: string;
} | null;

interface Options {
  withRules?: boolean;
  experimentalForceLongPolling?: boolean;
}

export const createItem = (description: unknown, amount: unknown, type: unknown) => {
  return {
    description,
    amount,
    type,
  };
};

export const setup = async (
  auth: UserAuth,
  { withRules, experimentalForceLongPolling }: Options
) => {
  const rules = withRules
    ? readFileSync('firestore.rules', 'utf8')
    : `service cloud.firestore {
    match /databases/{database}/documents {
      match /{documents=**} {
        allow read, write;
      }
    }
  }`;

  const testEnv = await initializeTestEnvironment({
    projectId: 'project-demo',
    firestore: {
      rules,
    },
  });

  const rulesTestContext = auth
    ? testEnv.authenticatedContext(auth.id, { ...auth, uid: undefined })
    : testEnv.unauthenticatedContext();
  const firebase = experimentalForceLongPolling
    ? rulesTestContext.firestore({ experimentalForceLongPolling })
    : rulesTestContext.firestore();

  return { testEnv, rulesTestContext, firebase };
};

export const addDataWithoutRulesFirestore = async (
  testEnv: RulesTestEnvironment,
  data?: Record<string, DocumentData>
) => {
  if (data) {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const firebase = context.firestore();
      for (const key in data) {
        const ref = firebase.doc(key);
        await ref.set(data[key]);
      }
    });
  }
};

export const teardown = async (rulesTestEnv: RulesTestEnvironment) => {
  await rulesTestEnv.cleanup();
};
