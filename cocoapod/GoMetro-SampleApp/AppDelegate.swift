//
//  AppDelegate.swift
//  GoMetro-SampleApp
//
//  Created by Malcolmn Roberts on 2020/05/07.
//  Copyright © 2020 Malcolmn Roberts. All rights reserved.
//

import UIKit
import GoMetroUma

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Override point for customization after application launch.
        GoMetroUma.shared.initialise(token: "...")
        
        // Done
        return true
        
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

}

