import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isSmallPhone = width < 360;
    const isPhone = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    const horizontalPadding = isSmallPhone ? 14 : isPhone ? 18 : isTablet ? 24 : 32;
    const sectionGap = isSmallPhone ? 14 : isPhone ? 18 : 22;
    const titleSize = clamp(width * 0.05, 18, 24);
    const subtitleSize = clamp(width * 0.032, 12, 16);
    const bodySize = clamp(width * 0.034, 12, 15);
    const compactLabelSize = clamp(width * 0.03, 11, 13);
    const tandasPanelHeight = clamp(height * 0.34, 240, 420);
    const tandasRowHeight = isSmallPhone ? 118 : isPhone ? 124 : 132;

    return {
      width,
      height,
      isSmallPhone,
      isPhone,
      isTablet,
      isDesktop,
      horizontalPadding,
      sectionGap,
      titleSize,
      subtitleSize,
      bodySize,
      compactLabelSize,
      tandasPanelHeight,
      tandasRowHeight,
    };
  }, [height, width]);
};
