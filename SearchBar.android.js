/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule SearchBar
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  Platform,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
} = ReactNative;

var IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

class SearchBar extends React.Component {
  render() {
    var background = IS_RIPPLE_EFFECT_SUPPORTED ?
                     TouchableNativeFeedback.SelectableBackgroundBorderless() :
                     TouchableNativeFeedback.SelectableBackground();
    return (
      <View style={styles.searchBar}>
        <TouchableNativeFeedback
          background={background}
          onPress={() => this.refs.input && this.refs.input.focus()}>
          <View>
            <Image
              source={require('image!android_search_white')}
              style={styles.icon}
            />
          </View>
        </TouchableNativeFeedback>
        <TextInput
          ref="input"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          onChange={this.props.onSearchChange}
          placeholder="Search a movie..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
        <ActivityIndicator
          animating={this.props.isLoading}
          color="white"
          size="large"
          style={styles.spinner}
        />
        <TouchableOpacity onPress={this.actBusy.bind(this)}>
          <View style={styles.button}>
            <Text>Spam mqt_js</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.spamBridge.bind(this)}>
          <View style={styles.button}>
            <Text>Spam bridge</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  
  /**
   * make mqt_js super busy
   */
  actBusy() {
    setTimeout(() => { this.actBusyFor(8000); }, 500);
  }
  
  
  actBusyFor(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  spamBridge() {
    for (var i = 0; i < 1000; i++) {
      this.initTimer();
    }
  }
  
  /**
   * will send a message over MessageQueue.js to trigger the Native "Timing.createTimer()"
   */
  initTimer() {
    const that = this;
    setTimeout(function() {
      that.initTimer();
    }, 1);
  }
}

var styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 0,
    backgroundColor: 'transparent'
  },
  spinner: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  button: {
    margin: 2
  }
});

module.exports = SearchBar;
