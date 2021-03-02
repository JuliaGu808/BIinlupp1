from matplotlib import pyplot as plt
import numpy as np

class draw:

    def test(self, lists):
        x1 = np.array(lists["ts"])
        y1 = np.array(lists["tmp"])
        x2 = np.array(lists["ts"])
        y2 = np.array(lists["hum"])

        # df = pd.DataFrame({
        #     'time': lists["ts"],
        #     'temperature': lists["tmp"],
        #     'humidity': lists["hum"],
        # })

        #ax = plt.gca()

        # df.plot(kind='line', x='time', y='temperature', ax=ax)
        # df.plot(kind='line', x='time', y='humidity', color='red', ax=ax)

        plt.figure(figsize=(20, 10))
        plt.plot(x1, y1, x2, y2)
        plt.title('DHT diagram')
        plt.ylabel('Value')
        plt.xlabel('Time')
        plt.savefig('../../frontpage/src/mytable.png')
        plt.close()