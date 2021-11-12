/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {createContext, ReactNode, useContext} from 'react';
import {useAllDocsData} from '@theme/hooks/useDocs';
import {PropSidebar} from '@docusaurus/plugin-content-docs';

// TODO not ideal, see also "useDocs"
export const isDocsPluginEnabled: boolean = !!useAllDocsData;

// Using a Symbol because null is a valid  context value (a doc can have no sidebar)
// Inspired by https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx
const EmptyContextValue: unique symbol = Symbol('EmptyContext');

const DocsSidebarContext = createContext<
  PropSidebar | null | typeof EmptyContextValue
>(EmptyContextValue);

export function DocsSidebarProvider({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: PropSidebar | null;
}): JSX.Element {
  return (
    <DocsSidebarContext.Provider value={sidebar}>
      {children}
    </DocsSidebarContext.Provider>
  );
}

export function useDocsSidebar(): PropSidebar | null {
  const sidebar = useContext(DocsSidebarContext);
  if (sidebar === EmptyContextValue) {
    throw new Error('This hook requires usage of <DocSidebarContextProvider>');
  }
  return sidebar;
}
