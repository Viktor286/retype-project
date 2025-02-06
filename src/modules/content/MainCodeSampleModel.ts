// todo: make revision
// Low update
export interface CodeSampleCore {
  id: string;
  title: string;
  totalChars: number;
  createdAt: number;
  contentLinesLen: number;
  html_url: string;
  sourceUrl: string;
  credentialRefs: {
    license: {
      key: string;
      name: string;
      spdx_id: string;
    };
    licenseOriginUrl: string;
    owner: string;
    repo: string;
  };
  contentAsLines: string[];
}

// Low update
export interface CodeSampleSemantics {
  id: string;
  description: string; // provide description
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  keywords: string[];
  categories: string[];
}

// Medium update
export interface CodeSampleActive {
  id: string;
  isFeatured: boolean;
  updatedAt: number;
}

// High update
export interface CodeSampleStats {
  id: string;
  activeUsersCount: number;
  viewsCount: number;
  completionCount: number;
  rating: number;
}

// resolved on FE
// language: string; // base on file ext
// completion time // based on totalChars

// CodeSamples API
// 1. openAI api for Semantics (part of next?)
// 2. Mongodb api for (Caching) CREATE
// 3. Mongodb for getting codesamples READ
// 4. Mongodb for update/delete

// User api
// Update firebase to keep stats. Plan mongo migration
