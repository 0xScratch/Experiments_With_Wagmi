'use client'

import { ethers } from 'ethers'

// INTENAL IMPORT
import { CrowdFundingABI, CrowdFundingAddress } from './constants'

import { useReadContract, useAccount } from 'wagmi'

export const getCampaigns = () => {
    const campaigns = useReadContract({
        abi: CrowdFundingABI,
        address: CrowdFundingAddress,
        functionName: 'getCampaigns'
    })

    const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
    }))

    return parsedCampaigns
}

export const getUserCampaigns = () => {
    const allCampaigns = useReadContract({
        abi: CrowdFundingABI,
        address: CrowdFundingAddress,
        functionName: 'getUserCampaigns'
    })

    const { address } = useAccount()

    const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address
    )

    const userData = filteredCampaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
        ),
        pId: i,
    }))

    return userData
}

export const getDonations = () => {
    const donations = useReadContract({
        abi: CrowdFundingABI,
        address: CrowdFundingAddress,
        functionName: 'getDonations'
    })
    const numberOfDonations = donations[0].length

    const parsedDonations = []

    for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
            donator: donations[0][i],
            amount: ethers.utils.formatEther(donations[1][i].toString()),
        })
    }

    return parsedDonations
}