
import pandas as pd
import numpy as np
import os
path = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../cred.json')

du = dateUtils()
uu = univUtils()
uu.load_universe()

class predictor_decision_tree(alphaLinear):
    def __init__(self, name, generic, start_dt, end_dt, y_horizon=3, y_var='O2O',
                 fit_halflife=1024, lambda_ridge=0.1, coef_prior=None, coef_bound=None,
                 auto_connect=True):
        super().__init__(name, generic, start_dt, end_dt, y_horizon, y_var,
                         fit_halflife, lambda_ridge, coef_prior, coef_bound)
        self.symbol2kw = symbol2kw
        if auto_connect:
            self.get_data()

    def univ(self):
        return list(symbol2kw.keys())

    def get_data(self):
        self.si_data = si.reindex(trading_dates).ffill()

    def getSearchDataBySymbol(self, symbol):
        start_dt = uu.universe[symbol]['startDate']
        dates = du.dateRange(max(start_dt, self.st), self.ed)
        kws = self.symbol2kw[symbol]
        bsi = self.si_data.reindex(kws, axis='columns').reindex(dates)
        return bsi

    @staticmethod
    def normalize(data):
        res = (data - data.median()) / stats.median_abs_deviation(data, scale='normal')
        res = res.clip(lower=np.quantile(res.dropna(), 0.025),
                       upper=np.quantile(res.dropna(), 0.975))
        return res

    @staticmethod
    def rsi(x, N=14):
        """
        the larger rsi is, the increasing momentum we will find
        :param x:
        :param N:
        :return:
        """
        x_diff = x.diff()
        up = x_diff.rolling(N).apply(lambda x: sum(x[x > 0]) / N)
        down = x_diff.rolling(N).apply(lambda x: np.abs(sum(x[x < 0])) / N)
        rs = up / down
        return 100 - 100 / (1 + rs)

    def makeXBySymbolImpl(self, symbol):
        """

        :param symbol:
        :return: Should be a DataFrame, instead of a series
        """
        bsi = self.getSearchDataBySymbol(symbol)
        bsi = bsi.loc[:, bsi.quantile(.8) > 200]
        # normalization
        # smoothing
        bsi = bsi.ewm(halflife=5, min_periods=5).mean().shift(1).dropna()

        xx = pd.DataFrame(0, index=bsi.index, columns=bsi.columns)

        for col in bsi.columns:
            tmp = pd.DataFrame(0, index=bsi.index, columns=[col])
            # filter
            tmp = tmp.mask((self.rsi(bsi[col], 20) < 30), 1)
            tmp = tmp.mask((self.rsi(bsi[col], 20) > 70), -1)
            xx[col] = tmp[col]
        xx = xx.mean(axis=1)
        xx = xx.reindex(du.dateRange(max(self.st, uu.universe[symbol]['startDate']), self.ed)).ffill().fillna(0.)
        return pd.DataFrame(xx)

    def makeCoef(self):
        """To make coef for each symbol be 1."""
        days = self.du.dateRange(self.st, self.ed)
        res = dict()
        for day in days:
            res[day] = np.array([[1.]])
        io_utils.upload_pickle_to_s3(config.bucket(), self.s3key('coef'), res)
        return res