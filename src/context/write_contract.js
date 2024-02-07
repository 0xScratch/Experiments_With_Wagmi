'use client'

import { ethers } from 'ethers'

// INTENAL IMPORT
import { CrowdFundingABI, CrowdFundingAddress } from './constants'

import { useWriteContract, useAccount, useSendTransaction, useReadContract } from 'wagmi'

const { writeContract } = useWriteContract()
const { sendTransaction } = useSendTransaction()

export const createCampaign = (campaign) => {
    const {title, description, amount, deadline} = campaign
    const { address } = useAccount()
    writeContract({
        abi: CrowdFundingABI,
        address: CrowdFundingAddress,
        functionName: 'createCampaign',
        args: [
            address, // owner
            title, // title
            description, // description
            ethers.utils.parseUtils(amount, 18), // amount
            new Date(deadline).getTime() // deadline
        ]
    })
}

export const donate = (pId, amount) => {
    writeContract({
        abi: CrowdFundingABI,
        address: CrowdFundingAddress,
        functionName: 'donate',
        args: [pId]
    })
    sendTransaction({
        to: CrowdFundingAddress,
        value: ethers.utils.parseEther(amount)
    })

    const campaignsData = useReadContract({
        abi: CrowdFundingABI,
        address: CrowdFundingAddress,
        functionName: 'getCampaigns'
    })

    location.reload()

    return campaignsData
}

