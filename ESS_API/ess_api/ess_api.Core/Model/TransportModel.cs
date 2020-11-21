﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class TransportModel : BaseModel
    {
        public TransportType Type { get; set; }
        // is visible for customers
        public bool IsActive { get; set; } = true;
        public string Name { get; set; }
        public string Description { get; set; }
        public Image Image { get; set; }
        public Price TotalPrice { get; set; } = new Price(0.0M);
    }

    public enum TransportType
    {
        PersonalPickup, // personal pickup on our point
        PersonalDelivery, // personal delivery by agent
        HomeDelivery, // delivery to the address
        DeliveryPoint // delivery to the delivery point
    }
}
