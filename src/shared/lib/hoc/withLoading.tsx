import React from "react";

export function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  type PropsWithLoading = P & { isLoading: boolean };

  const ComponentWithLoading: React.FC<PropsWithLoading> = (props) => {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(rest as P)} />;
  };

  return ComponentWithLoading;
}
