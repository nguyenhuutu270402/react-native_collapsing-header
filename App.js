import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Animated } from 'react-native';

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    50 // hieght cua box header
  )

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(Math.max(_clampedScrollValue + diff, 0), 50);
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    })
  }, [])
  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  const bottomTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });

  const scrollEndTimer = useRef(null);

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer.current);
  };

  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > 50 && _clampedScrollValue > 50 / 2
        ? _offsetValue + 50
        : _offsetValue - 50;
    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer.current = setTimeout(onMomentumScrollEnd, 250);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.boxScroll}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={1}
      >
        <View style={styles.boxContent}>
          <Text style={styles.textContent}>
            Lịch sử Việt Nam (Hán-Nôm: 歷史越南) nếu tính từ lúc có mặt con người sinh sống thì đã có hàng vạn năm trước Công Nguyên, còn tính từ khi cơ cấu nhà nước được hình thành thì mới khoảng từ năm 700 năm trước công nguyên.

            Các nhà khảo cổ đã tìm thấy các di tích chứng minh loài người đã từng sống tại Việt Nam từ thời đại đồ đá cũ thuộc nền văn hóa Tràng An, Ngườm, Sơn Vi và Soi Nhụ. Vào thời kỳ đồ đá mới, nền văn hóa Hòa Bình – Bắc Sơn tại vùng này đã phát triển về chăn nuôi và nông nghiệp, đặc biệt là kỹ thuật trồng lúa nước. Những người Việt tiền sử trên vùng châu thổ sông Hồng – Văn minh sông Hồng và sông Mã này đã khai hóa đất để trồng trọt, tạo ra một hệ thống đê điều để chế ngự nước lụt của các sông, đào kênh để phục vụ cho việc trồng lúa và đã tạo nên nền văn minh lúa nước và văn hóa làng xã.

            Truyền thuyết kể rằng từ năm 2879 TCN, nhà nước Xích Quỷ của người Việt đã hình thành, cùng thời với truyền thuyết về Tam Hoàng Ngũ Đế tại Trung Quốc. Tuy nhiên, đây chỉ là truyền thuyết dân gian, các nghiên cứu khảo cổ hiện chưa tìm được bằng chứng nào cho thấy nhà nước này từng tồn tại.

            Đến thời kỳ đồ sắt, vào khoảng thế kỷ 8 TCN đã xuất hiện nhà nước đầu tiên của người Việt trên miền Bắc Việt Nam ngày nay. Theo sử sách, đó là Nhà nước Văn Lang của các vua Hùng. Thời kỳ Vua Hùng được nhiều người ghi nhận là quốc gia có tổ chức đầu tiên của người Việt Nam, bắt đầu với truyền thuyết Con Rồng cháu Tiên mà người Việt Nam tự hào truyền miệng từ đời này qua đời khác.[1]
          </Text>
          <Text style={styles.textContent}>
            Khu vực nay là Việt Nam đã có người ở từ thời kỳ đồ đá cũ. Các nhà khảo cổ đã tìm ra các dấu vết người thượng cổ cư ngụ tại hang Thẩm Hoi, Thẩm Khuyên (Lạng Sơn), núi Đọ (Thanh Hóa), Thung Lang (Ninh Bình) và Nga Sơn, Thanh Hóa cách đây hàng trăm nghìn năm. Thời kỳ này mực nước biển thấp hơn, và Việt Nam khi đó nối liền với bán đảo Malaysia, đảo Java, Sumatra và Kalimantan của Indonesia, với khí hậu ẩm và mát hơn bây giờ. Người Việt cổ khai thác đá gốc (ba-dan) ở sườn núi, ghè đẽo thô sơ một mặt, tạo nên những công cụ mũi nhọn, rìa lưỡi dọc, rìa lưỡi ngang, nạo,... bỏ lại nơi chế tác những mảnh đá vỡ (mảnh tước). Những di tích ở núi Đọ được coi là bằng chứng cổ xưa nhất về sự có mặt của con người tại vùng đất Việt, khi tổ chức xã hội loài người chưa hình thành.

            Vào thời kỳ mà các nhà nghiên cứu gọi là Văn hóa Sơn Vi, những nhóm cư dân nguyên thủy tại đây đã sinh sống bằng hái lượm và săn bắt trong một hệ sinh thái miền nhiệt - ẩm với một thế giới động vật và thực vật phong phú, đa dạng cách đây 11-23 nghìn năm, cuối thế Canh Tân (Late Pleistocene).

            Cách đây 15.000 – 18.000 năm trước, đây là thời kỳ nước biển xuống thấp. Đồng bằng Bắc Bộ bấy giờ kéo dài ra mãi đến tận đảo Hải Nam và các khu vực khác. Về mặt địa chất học thời kỳ khoảng 15 nghìn năm trước Công nguyên (cách đây khoảng 18 nghìn năm) là thời kỳ cuối của kỷ băng hà, nước biển dâng cao dần đến khoảng năm 8.000 năm trước đây thì đột ngột dâng cao khoảng 130m (tính từ tâm của kỷ băng hà là khu vực Bắc Mỹ). Nước biển ở lại suốt thời kỳ này cho đến và rút đi vào khoảng 5.500 năm trước đây. Ứng với thời kỳ này cùng với các di chỉ khảo cổ cho thấy nước biển đã ngập toàn bộ khu vực đồng bằng sông Hồng ngày nay đến tận Vĩnh Phúc trong suốt gần 3.000 năm.

            Do chính đặc trưng về địa chất nên vùng đồng bằng sông Hồng, vịnh Bắc bộ không có điều kiện khai quật nền đất cổ đại có ở khoảng 8.000 năm trước Công nguyên (trước khi có đại hồng thủy) để xác nhận dấu vết của các nền văn minh khác nếu có. Trang sử Việt có một khoảng trống không xác định được từ khoảng năm trước 5.500 năm - 18.000 năm trước.

            Sau thời kỳ văn hóa Sơn Vi là văn hóa Hòa Bình và Bắc Sơn, thuộc thời kỳ đồ đá mới. Văn hóa Hòa Bình được ghi nhận là cái nôi của nền văn minh lúa nước, xuất thân từ Đông Nam Á có niên đại trễ được tìm thấy vào khoảng 15000 năm trước đây. Do đặc trưng địa chất về hồng thủy nên có thể một phần sự phát triển rực rỡ của nền văn hóa Hòa Bình có thể đã chưa bao giờ được nhận ra và tìm thấy. Các nhà khảo cổ đã liên kết sự khởi đầu của nền văn minh người Việt ở cuối thời kỳ đồ đá mới và đầu thời đại đồ đồng (vào khoảng hơn 5700 năm trước Công nguyên).[2]
          </Text>
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.boxHeader, { top: 0, transform: [{ translateY: headerTranslate }] }]} >
        <Text>Header</Text>
      </Animated.View>
      <Animated.View style={[styles.boxBottom, { bottom: 0, transform: [{ translateY: bottomTranslate }] }]}>
        <Text>Bottom</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  boxScroll: {
    // backgroundColor: 'red',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textContent: {
    fontSize: 20,
  },
  boxContent: {
    width: '80%',
    paddingTop: 50,
  },
  boxBottom: {
    height: 50,
    width: '100%',
    backgroundColor: 'cyan',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  boxHeader: {
    height: 50,
    width: '100%',
    backgroundColor: 'tomato',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  container: {

  },
});
