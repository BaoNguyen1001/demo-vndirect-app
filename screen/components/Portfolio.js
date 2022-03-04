import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

Portfolio.propTypes = {};

function Portfolio(props) {
  const { data } = props;
  const [isShowDetail, setIsShowDetail] = React.useState(false);
  const handleOnPress = React.useCallback(() => {
    setIsShowDetail(!isShowDetail);
  });
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={{
          flexDirection: "column",
          marginHorizontal: 10,
          marginVertical: 2,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <Image
            style={{
              width: 42,
              height: 42,
              alignItems: "flex-start",
              backgroundColor: "white",
              marginRight: 10,
              borderRadius: 10,
            }}
            source={{
              uri: "https://finance.vietstock.vn/image/" + data?.id,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {data?.id}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#AAAAAA" }}>{data?.date}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {data?.giaHienTai && addCommas(data?.giaHienTai)}
            </Text>
            <Text
              style={data?.rate > 0 ? { color: "green" } : { color: "red" }}
            >
              {data?.rate}%
            </Text>
          </View>
        </View>
        {isShowDetail && (
          <View style={{ width: "100%", height: 120 }}>
            <View
              style={{
                height: 85,
                width: "100%",
                backgroundColor: "rgba(247, 147, 36, 0.1)",
                marginBottom: 0,
                marginTop: "auto",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: -23,
                }}
              >
                <View style={styles.box}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    Điểm mua
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {data?.diemMua && addCommas(data?.diemMua)}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    Mục tiêu
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {data?.giaMucTieu && addCommas(data?.giaMucTieu)}
                  </Text>
                </View>
                <View style={styles.box}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    Cắt lỗ
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {data?.giaCatLo && addCommas(data?.giaCatLo)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "auto",
                  marginBottom: 0,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                {/* <Ionicons name="thumbs-up" size={16} color={"black"} /> */}
                <Image
                  style={{ width: 16 }}
                  resizeMode={true}
                  source={require("../../assets/icons/quote.png")}
                />
                <Text style={{ fontSize: 14, marginLeft: 10 }}>
                  {data?.recommend}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 90,
    backgroundColor: "#F79324",
    borderRadius: 10,
    padding: 10,
  },
});

function addCommas(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

export default Portfolio;