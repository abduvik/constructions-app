import { container } from "../dependencies";
import { ElementType } from "react";

type DependencyInjector = (
  dependencies: { [key: string]: symbol },
  Component: ElementType
) => any;

export const withDependencies: DependencyInjector = (
  dependencies,
  Component
) => {
  const resolvedDependencies: any = {};
  Object.keys(dependencies).forEach((prop) => {
    const dependencyKey = dependencies[prop];
    resolvedDependencies[prop] = container.get(dependencyKey);
  });

  return (props: any) => <Component {...resolvedDependencies} {...props} />;
};
