import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, ActivityIndicator, Share, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL_BLOCKCHAIN } from "../../config";
import User from "../../components/User";
import axios from "axios";

const ReferAndEarnScreen = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState('');
  const { user } = User();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL_BLOCKCHAIN}/api/v1/referral/referral.php?user_id=${user.id}`,
          {
            headers: { user_id: user.id, "Content-Type": 'application/json' },
          }
        );

        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error?.response?.data);
      }
    };
    fetchDetails();
  }, [user]);

  const copyToClipboard = async (text, type) => {
    await Clipboard.setString(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 3000); // Reset after 3 seconds
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join me on FlexApp and get rewards! Use my referral code: ${details?.referral_code}. Sign up here: ${details?.referral_link}`,
        url: details?.referral_link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ height: Dimensions.get('screen').height * 0.95,justifyContent: 'space-between', flexDirection: 'column'}}>
      <View>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Refer and Earn</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Referral</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Number of referral</Text>
          <Text style={styles.statValue}>{details? details.total_referral : 0}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Earning Till Date</Text>
            <Text style={styles.statValueBlue}>USDC {details? details.total_earning_till_date : 0}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Earning Balance</Text>
            <Text style={styles.statValueBlue}>USDC {details? details.earning : 0}</Text>
        </View>
      </View>
      </View>

      <View style={styles.iconContainer}>
          <Image source={require('../../../assets/icons/referral.png')}  style={styles.icon}/>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Refer and Earn Free USDC</Text>
        <Text style={styles.infoText}>
          Introducing FlexApp Referral! Join our referral program and earn USDC. Each time someone registers using your referral link, you'll earn 0.01 USDC. Additionally, you'll receive 10% of the fees each time your referred person makes a payment. Refer, share, and start earning today!
        </Text>

        <Text style={styles.inputLabel}>Your Referral Link</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={details? details.referral_link : ''}
            editable={false}
          />
          <TouchableOpacity 
            style={styles.copyButton}
            onPress={() => copyToClipboard(details?.referral_link, 'link')}
          >
            <Ionicons name="copy-outline" size={16} color="white" />
            <Text style={styles.copyButtonText}>
              {copiedText === 'link' ? 'Copied!' : 'Copy Link'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>Your Referal Code</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={details? details.referral_code : ''}
            editable={false}
          />
          <TouchableOpacity 
            style={styles.copyButton}
            onPress={() => copyToClipboard(details?.referral_code, 'code')}
          >
            <Ionicons name="copy-outline" size={16} color="white" />
            <Text style={styles.copyButtonText}>
              {copiedText === 'code' ? 'Copied!' : 'Copy Code'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Ionicons name="share-social-outline" size={20} color="white" />
          <Text style={styles.shareButtonText}>SHARE NOW</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight:30,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    color: '#666',
    lineHeight:30,
  },
  statValue: {
    fontWeight: 'bold',
  },
  statValueBlue: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    height: 150,
    width: 200
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 0,
    height: 500,
    justifyContent: 'space-between'
  },
  infoText: {
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 20,
  },
  inputLabel: {
    fontSize: 20,
    color: '#666',
    marginBottom: 4,
    fontWeight:'700'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  copyButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButtonText: {
    color: 'white',
    marginLeft: 4,
  },
  shareButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default ReferAndEarnScreen;