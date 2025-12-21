import React from "react";

export type WithLoadingProps<P> = P & { isLoading: boolean };

export function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithLoading: React.FC<WithLoadingProps<P>> = (props) => {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(rest as P)} />;
  };

  return ComponentWithLoading;
}
