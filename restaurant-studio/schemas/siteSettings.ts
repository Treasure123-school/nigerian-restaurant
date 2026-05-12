import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'restaurantName',
      title: 'Restaurant Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Footer Description',
      type: 'text',
      rows: 2,
      description: 'Short description shown in the footer under the restaurant name.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Main contact phone number displayed on the Contact page (e.g. +234 801 234 5678)',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email displayed on the Contact page (e.g. hello@iyabeji.com)',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code, e.g. +2348012345678 — used for WhatsApp order links across the site.',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'text',
      rows: 4,
      description: 'Use line breaks for each day range, e.g.:\nMon – Fri: 11AM – 10PM\nSat – Sun: 10AM – 11PM',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
        {name: 'facebook',  type: 'url', title: 'Facebook URL'},
        {name: 'twitter',   type: 'url', title: 'Twitter / X URL'},
        {name: 'tiktok',    type: 'url', title: 'TikTok URL'},
        {name: 'youtube',   type: 'url', title: 'YouTube URL'},
      ],
    }),
  ],
})
