import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  footerContainer: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.secondary,
    borderTopWidth: 4,
    padding: 10,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  totalContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  totalText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  totalPriceText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
});
