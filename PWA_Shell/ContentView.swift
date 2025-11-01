//
//  ContentView.swift
//  PWA_Shell
//
//  Created by Backup Admin on 11/1/25.
//

import SwiftUI
import WebKit

struct ContentView: View {
    var body: some View {
        WebView()
            .edgesIgnoringSafeArea(.all)
    }
}

struct WebView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        
        // Enable JavaScript
        let preferences = WKPreferences()
        configuration.preferences = preferences
        
        // Add message handler for haptic feedback
        let contentController = WKUserContentController()
        contentController.add(context.coordinator, name: "haptic")
        configuration.userContentController = contentController
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        
        // Allow camera and microphone access
        webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        // Load the PWA - files are in the bundle root, not in a PWA subdirectory
        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            print("✅ Found PWA at: \(url.path)")
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            print("❌ Failed to find PWA files in bundle")
            // Try to find PWA directory
            if let bundlePath = Bundle.main.resourcePath {
                print("Bundle path: \(bundlePath)")
                print("Looking for index.html in bundle root")
                
                // Load a fallback error page
                let errorHTML = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Error</title>
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                            padding: 40px;
                            text-align: center;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .error-container {
                            background: rgba(255, 255, 255, 0.1);
                            padding: 30px;
                            border-radius: 15px;
                            backdrop-filter: blur(10px);
                        }
                        h1 { font-size: 2em; margin-bottom: 20px; }
                        p { font-size: 1.1em; margin: 10px 0; }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h1>⚠️ PWA Not Found</h1>
                        <p>Unable to locate PWA files in the app bundle.</p>
                        <p>Please ensure the PWA folder is included in the Xcode project.</p>
                        <p><small>Expected path: index.html in bundle root</small></p>
                    </div>
                </body>
                </html>
                """
                webView.loadHTMLString(errorHTML, baseURL: nil)
            }
        }
        
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        // No updates needed
    }
    
    class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
        var parent: WebView
        
        init(_ parent: WebView) {
            self.parent = parent
        }
        
        // Handle messages from JavaScript
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "haptic" {
                // Trigger haptic feedback
                let generator = UIImpactFeedbackGenerator(style: .medium)
                generator.impactOccurred()
            }
        }
        
        // Handle camera and microphone permissions
        func webView(_ webView: WKWebView, requestMediaCapturePermissionFor origin: WKSecurityOrigin, initiatedByFrame frame: WKFrameInfo, type: WKMediaCaptureType, decisionHandler: @escaping (WKPermissionDecision) -> Void) {
            decisionHandler(.grant)
        }
        
        // Handle JavaScript alerts
        func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
            let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { _ in
                completionHandler()
            }))
            
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
               let rootViewController = windowScene.windows.first?.rootViewController {
                rootViewController.present(alert, animated: true)
            }
        }
        
        // Handle navigation errors
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            print("❌ WebView navigation failed: \(error.localizedDescription)")
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            print("❌ WebView failed: \(error.localizedDescription)")
        }
        
        // Log successful loads
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            print("✅ WebView loaded successfully")
        }
    }
}

#Preview {
    ContentView()
}
